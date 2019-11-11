class AddIntroduceToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :introduce, :string
  end
end
