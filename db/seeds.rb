# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

u1 = User.create name: 'unicar', email: 'carnival@yeah.net', password: 'chicken', image: 'https://api.adorable.io/avatars/285/carnival@yeah.png'

Post.destroy_all

p1 = Post.create image: 'http://fillmurray.com/400/300'

u1.posts << p1
