class MessagesController < ApplicationController
  before_action :move_to_index, except: :index

  def index
  end
  def  move_to_index
    direct_to action: :index unless user_signed_in?
  end
  
end