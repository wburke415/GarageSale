class CreateBids < ActiveRecord::Migration[5.2]
  def change
    create_table :bids do |t|
      t.integer :product_id, null: false
      t.float :bid, null: false
      t.timestamps
    end

    add_index :bids, :product_id
  end
end
