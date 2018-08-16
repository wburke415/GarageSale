class AddSearchStringColumnToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :search_string, :string, null: false
    add_index :products, :search_string
  end
end
