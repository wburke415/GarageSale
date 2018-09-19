class ChangeEndsAt < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :ends_at, :datetime
  end
end
