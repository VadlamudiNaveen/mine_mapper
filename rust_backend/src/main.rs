use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlPool;
use std::env;

#[derive(Serialize, Deserialize)]
struct Mine {
    id: i32,
    name: String,
    description: Option<String>,
    operation_start_date: Option<NaiveDate>,
    latitude: f64,
    longitude: f64,
}

#[derive(Deserialize)]
struct CreateMine {
    name: String,
    description: Option<String>,
    operation_start_date: Option<NaiveDate>,
    latitude: f64,
    longitude: f64,
}

struct AppState {
    db: MySqlPool,
}

#[get("/mines")]
async fn get_mines(data: web::Data<AppState>) -> HttpResponse {
    match sqlx::query!(
        r#"
        SELECT 
            id,
            name,
            description,
            operation_start_date,
            ST_X(location) as latitude,
            ST_Y(location) as longitude
        FROM mines
        "#
    )
    .fetch_all(&data.db)
    .await
    {
        Ok(rows) => {
            let mines: Vec<Mine> = rows
                .into_iter()
                .map(|row| Mine {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    operation_start_date: row.operation_start_date,
                    latitude: row.latitude.unwrap_or(0.0),
                    longitude: row.longitude.unwrap_or(0.0),
                })
                .collect();
            HttpResponse::Ok().json(mines)
        }
        Err(e) => {
            log::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json("Internal server error")
        }
    }
}

#[post("/mines")]
async fn create_mine(data: web::Data<AppState>, mine: web::Json<CreateMine>) -> HttpResponse {
    println!(
        " Name: {}, Latitude: {}, Longitude: {}",
        mine.name,
        mine.latitude,
        mine.longitude
    );

    match sqlx::query!(
        r#"
        INSERT INTO mines (name, description, operation_start_date, location)
        VALUES (?, ?, ?, ST_PointFromText(CONCAT('POINT(', ?, ' ', ?, ')')))
        "#,
        mine.name,
        mine.description,
        mine.operation_start_date,
        mine.latitude,
        mine.longitude
    )
    .execute(&data.db)
    .await
    {
        Ok(_) => HttpResponse::Created().json("Mine created successfully"),
        Err(e) => {
            log::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json("Failed to create mine")
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    let pool = MySqlPool::connect(&database_url)
        .await
        .expect("Failed to create pool");

    println!("Server running at http://127.0.0.1:8083");

    HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::permissive(),
            )
            .data(AppState {
                db: pool.clone(),
            })
            .service(get_mines)
            .service(create_mine)
    })
    .bind("127.0.0.1:8083")?
    .run()
    .await
}

