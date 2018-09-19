class RemoveReservePrice < ActiveRecord::Migration[5.2]
  def change
    remove_column :products, :reserve_price
  end
end
