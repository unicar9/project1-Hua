class SessionController < ApplicationController
  def new
  end

  def create
    params["password"]
    user = User.find_by email: params[:email]
    if user.present? and user.authenticate(params[:password])
      # success!
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      # mismatch/bad credentials
      flash[:error] = "Incorrect email address and/or password"
      redirect_to login_path
    end

  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
