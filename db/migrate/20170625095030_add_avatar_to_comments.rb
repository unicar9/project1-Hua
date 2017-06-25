class AddAvatarToComments < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :avatar, :text
  end
end
