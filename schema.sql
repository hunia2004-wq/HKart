CREATE TABLE order_items (created_at timestamp with time zone, id uuid, price_when_purchased numeric, quantity integer, product_id uuid, order_id uuid);
CREATE TABLE orders (id uuid, created_at timestamp with time zone, user_id uuid, payment_method text, status text, Total_price numeric);
CREATE TABLE products (description text, id uuid, price numeric, stock_quantity integer, created_at timestamp with time zone, name text, image_url text, category text, barcode character varying);
CREATE TABLE profiles (updated_at timestamp with time zone, created_at timestamp with time zone, image_url text, id uuid, website text, username text);
CREATE TABLE shopping_cart (quantity integer, id uuid, created_at timestamp with time zone, user_id uuid, product_id uuid);
CREATE TABLE stores (latitude double precision, phone text, id uuid, longitude double precision, name text, created_at timestamp with time zone, address text);
CREATE TABLE wishlist (user_id uuid, product_id uuid, created_at timestamp with time zone, id uuid);