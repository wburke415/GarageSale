class AddSoldColumnToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :sold, :boolean, null: false, default: false
    add_index :products, :sold
  end
end
