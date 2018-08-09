class AddBuyerColumnToBids < ActiveRecord::Migration[5.2]
  def change
    add_column :bids, :buyer_id, :integer, null: false
    add_index :bids, :buyer_id
  end
end
