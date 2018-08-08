class ChangeProductsTable < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :condition, :string
  end
end
