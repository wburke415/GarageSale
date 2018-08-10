class AddDescriptionColumnToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :description, :text, null: false
  end
end
