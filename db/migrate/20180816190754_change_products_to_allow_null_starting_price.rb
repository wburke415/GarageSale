class ChangeProductsToAllowNullStartingPrice < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :starting_price, :float, null: true
  end
end
