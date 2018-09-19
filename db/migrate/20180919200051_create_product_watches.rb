class CreateProductWatches < ActiveRecord::Migration[5.2]
  def change
    create_table :product_watches do |t|
      t.integer :product_id, null: false
      t.integer :watcher_id, null: false
      t.timestamps
    end

    add_index :product_watches, :product_id
    add_index :product_watches, :watcher_id
  end
end
