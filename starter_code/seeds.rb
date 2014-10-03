require 'pry'
require_relative './db/connection'
require_relative './lib/category'
require_relative './lib/contact'

Category.delete_all
Contact.delete_all

actors = Category.create(name: "actors")
singers = Category.create(name: "singers")
dancers = Category.create(name: "dancers")

Contact.create(name: "Sean", category_id: actors.id)
Contact.create(name: "Jeff", category_id: singers.id)
Contact.create(name: "Neel", category_id: dancers.id)
