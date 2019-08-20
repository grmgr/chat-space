class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  valifdates :content, presence: true, unless: :image? 
end