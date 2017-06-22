class AddNameToComments < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :name, :string
  end
end
