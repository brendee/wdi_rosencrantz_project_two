require 'active_record'

ActiveRecord::Base.establish_connection({
  :adapter => "postgresql",
  :host => "localhost",
  :username => "brendadargan",
  :database => "contact_list"
})

ActiveRecord::Base.logger = Logger.new(STDOUT)
