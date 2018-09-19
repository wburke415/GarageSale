class AddEndTime < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :ends_at, :date, null: false
    add_index :products, :ends_at
  end
end
