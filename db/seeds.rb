# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')
User.create!([
{name: "Sofia", email: "myMail@mail.ru", password: "123"},
])
# password: "aaa555*" в 14 строке было

Image.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('images')
Image.create([
{name: 'Невидимка', file: 'Bisser_1.jpg', theme_id: 1},
{name: 'Серьги', file: 'Bisser_8.jpg', theme_id: 1},
{name: 'Серьги из набора', file: 'Bisser_9.jpg', theme_id: 1},

{name: 'Белый чекер', file: 'Bisser_2.jpg', theme_id: 2},
{name: 'Белые бусы', file: 'Bisser_4.jpg', theme_id: 2},
{name: 'Голубые бусы', file: 'Bisser_5.jpg', theme_id: 2},
{name: 'Колье из набора', file: 'Bisser_9.jpg', theme_id: 2},

{name: 'Кольца динозавры', file: 'Bisser_6.jpg', theme_id: 3},
{name: 'Кольцо из набора', file: 'Bisser_9.jpg', theme_id: 3},
{name: 'Кольцо "Весеннее"', file: 'Bisser_14.jpg', theme_id: 3},

{name: 'Браслеты "Вишня"', file: 'Bisser_7.jpg', theme_id: 4},
{name: 'Узкие фенечки', file: 'Bisser_11.jpg', theme_id: 4},
{name: 'Широкие фенечки', file: 'Bisser_12.jpg', theme_id: 4},

{name: 'Брелок', file: 'Bisser_3.jpg', theme_id: 5},
{name: 'Фигурка дракона', file: 'Bisser_10.jpg', theme_id: 5},
{name: 'Подставка "Кот"', file: 'Bisser_13.jpg', theme_id: 5},
])


Theme.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('themes')
Theme.create([
{name: "Серьги и заколки"},     
{name: "Украшения на шею"},      
{name: "Кольца"},   
{name: "Браслеты"},      
{name: "Прочее"},    
])