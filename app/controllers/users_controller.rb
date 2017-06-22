class UsersController < ApplicationController
  before_action :get_user, only: [:show, :edit, :update] #except works too
  # before_action :check_if_admin, only: [:index]

  before_action :check_if_logged_in, only: [:edit, :update]

  def welcome
  end

  def get_user
    @user = User.find params['id']
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    image = "https://api.adorable.io/avatars/200/#{@user.email}"
    @user.image = image  #give new user a generated avatar

    if params[:file].present?
      req = Cloudinary::Uploader.upload params[:file]
      @user.image = req['public_id']
    end
    @user.save

    if @user.id.present?
      session[:user_id] = @user.id
      redirect_to user_path(@user.id)
    else
      render :new
    end
  end

  def index
    @users = User.all
  end

  def show
    get_user
  end

  def edit
    redirect_to root_path unless @current_user == @user
  end

  def update
    @user = @current_user
    @user.update user_params
    redirect_to user_path(params['id'])
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :image)
  end
end
