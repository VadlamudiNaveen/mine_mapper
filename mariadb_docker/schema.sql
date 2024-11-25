CREATE DATABASE MINE_MAPPER;
use MINE_MAPPER;



CREATE TABLE incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    incident_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location POINT NOT NULL
) ENGINE=InnoDB;

-- Add spatial index to optimize spatial queries
CREATE SPATIAL INDEX idx_location ON incidents(location);



CREATE TABLE mines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    operation_start_date DATE,
    location POINT NOT NULL 
) ENGINE=InnoDB;

-- Spatial index for optimization
CREATE SPATIAL INDEX idx_mine_location ON mines(location);


-- Sudbury Mine Data in MariaDB
INSERT INTO mines (name, description, operation_start_date, location)
VALUES
    ('Sudbury Nickel Mine', 'Nickel mine operating since the 1880s', '1883-09-01', ST_GeomFromText('POINT(-81.0076 46.4923)', 4326)),
    ('Copper Cliff Mine', 'Major copper mine in Sudbury', '1886-11-15', ST_GeomFromText('POINT(-81.0372 46.4792)', 4326)),
    ('Frood-Stobie Mine', 'A significant nickel and copper producer', '1901-03-18', ST_GeomFromText('POINT(-81.0089 46.5043)', 4326)),
    ('Garson Mine', 'Nickel mine with a deep shaft', '1911-07-21', ST_GeomFromText('POINT(-81.0403 46.5125)', 4326)),
    ('Totten Mine', 'A new generation nickel mine', '2014-02-12', ST_GeomFromText('POINT(-81.1684 46.4817)', 4326)),
    ('Creighton Mine', 'The deepest mine in the Sudbury Basin', '1900-05-10', ST_GeomFromText('POINT(-81.1053 46.4485)', 4326)),
    ('Clarabelle Mine', 'Major nickel and copper mine', '1971-06-15', ST_GeomFromText('POINT(-81.0189 46.4786)', 4326)),
    ('Levack Mine', 'One of the older mines in the Sudbury region', '1910-09-20', ST_GeomFromText('POINT(-81.0711 46.5657)', 4326)),
    ('Thayer Lindsley Mine', 'Major mine in the Sudbury area', '1969-08-23', ST_GeomFromText('POINT(-81.0567 46.5141)', 4326));

   
   
INSERT INTO mines (name, description, operation_start_date, location) VALUES
('Oldman Coal Mine', 'One of the first coal mines in the Lethbridge area, instrumental in powering the local railways.', '1905-03-15', ST_PointFromText('POINT(49.6935 -112.8418)')),
('Bearpaw Pit', 'A coal mine that faced early closure due to the economic downturn in the 1930s.', '1912-07-01', ST_PointFromText('POINT(49.7066 -112.8553)')),
('Crowfoot Quarry', 'A limestone quarry extensively used during Calgary''s early urban development.', '1886-05-10', ST_PointFromText('POINT(51.0453 -114.0572)')),
('Black Diamond Mine', 'A major coal supplier to local industries during WWII.', '1908-11-20', ST_PointFromText('POINT(51.0001 -114.0672)')),
('West Valley Mine', 'Known for employing innovative mining techniques of the time.', '1915-06-08', ST_PointFromText('POINT(49.7010 -112.8511)')),
('Crowsnest Drift', 'A coal mine closed after a tunnel collapse made operations unsafe.', '1920-09-14', ST_PointFromText('POINT(49.6932 -112.8321)')),
('Elbow Ridge Mine', 'A limestone quarry converted into a historical park.', '1890-04-18', ST_PointFromText('POINT(51.0278 -114.0870)')),
('Foothill Seam Mine', 'Played a role in supplying coal during the Great Depression.', '1918-12-05', ST_PointFromText('POINT(49.6950 -112.8653)')),
('Rocky Ridge Quarry', 'A limestone quarry now repurposed into a community recreational site.', '1902-08-22', ST_PointFromText('POINT(51.1126 -114.2123)')),
('Chinook Drift Mine', 'Operated by one of Alberta''s prominent mining companies in the early 20th century.', '1903-10-30', ST_PointFromText('POINT(49.7102 -112.8513)')),
('Bow River Quarry', 'Extracted limestone for early Calgary infrastructure projects.', '1895-06-14', ST_PointFromText('POINT(51.0450 -114.0859)')),
('Cedar Valley Mine', 'A medium-scale coal mine supplying the local economy.', '1910-08-19', ST_PointFromText('POINT(49.6784 -112.8402)')),
('Prairie Drift Mine', 'Operated through difficult terrain, eventually abandoned.', '1925-11-07', ST_PointFromText('POINT(49.6941 -112.8350)')),
('Glenbow Pit', 'Limestone quarry supporting Calgary''s growing construction needs.', '1882-03-03', ST_PointFromText('POINT(51.0830 -114.1830)')),
('Ironstone Drift', 'A small coal mine with limited production.', '1916-04-25', ST_PointFromText('POINT(49.7077 -112.8534)')),
('Highland Quarry', 'Provided limestone for road construction projects.', '1898-10-11', ST_PointFromText('POINT(51.1222 -114.2345)')),
('Maple Leaf Mine', 'A coal mine with a notable contribution during wartime.', '1912-01-20', ST_PointFromText('POINT(49.7105 -112.8458)')),
('Southern Ridge Mine', 'Short-lived operation due to low-quality coal seams.', '1923-09-30', ST_PointFromText('POINT(49.6883 -112.8267)')),
('Buffalo Quarry', 'Famous for producing high-quality limestone.', '1900-12-13', ST_PointFromText('POINT(51.0765 -114.1234)')),
('Ashcroft Mine', 'A coal mine located near major transportation routes.', '1920-07-15', ST_PointFromText('POINT(49.7050 -112.8420)')),
('Golden Rock Quarry', 'Supplied limestone to Calgary''s major landmarks.', '1905-03-28', ST_PointFromText('POINT(51.0457 -114.0613)')),
('Northfield Drift', 'Small coal mine serving local agricultural needs.', '1914-02-02', ST_PointFromText('POINT(49.6902 -112.8378)')),
('Timberline Quarry', 'Limestone quarry supporting industrialization.', '1892-09-18', ST_PointFromText('POINT(51.0970 -114.2133)')),
('Eagle Cliff Mine', 'Coal mine operational during Alberta''s economic boom.', '1919-05-11', ST_PointFromText('POINT(49.6992 -112.8301)')),
('Riverbend Pit', 'A limestone quarry near the Bow River.', '1888-06-01', ST_PointFromText('POINT(51.0345 -114.0712)')),
('Spruce Hill Mine', 'Known for its challenging underground mining conditions.', '1922-11-20', ST_PointFromText('POINT(49.6955 -112.8419)')),
('Sunrise Quarry', 'Extracted limestone from sun-facing cliffs.', '1896-04-27', ST_PointFromText('POINT(51.1056 -114.2054)')),
('Silver Ridge Mine', 'Coal mine producing high-grade resources.', '1917-03-14', ST_PointFromText('POINT(49.6978 -112.8503)')),
('Stony Trail Quarry', 'Provided construction materials for Calgary''s early roads.', '1899-08-15', ST_PointFromText('POINT(51.1367 -114.2271)')),
('Clearwater Mine', 'A deep coal mine near the Oldman River.', '1913-09-12', ST_PointFromText('POINT(49.6851 -112.8397)')),
('Midland Quarry', 'Known for high-purity limestone deposits.', '1907-02-22', ST_PointFromText('POINT(51.0517 -114.0713)'));

   
  SELECT * from mines;
 
