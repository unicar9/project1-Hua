class CommentsController < ApplicationController
  before_action :find_post

  def new
  end

  def create
    @comment = @post.comments.create(params[:comment].permit(:content))
    @comment.user = @current_user
    @comment.save

    if @comment.save
      redirect_to post_path(@post)
    else
      render 'new'
    end
  end

  def index
  end

  def show
  end

  def destroy
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.destroy
    redirect_to post_path(@post)
  end

  private
  def find_post
    @post = Post.find(params[:post_id])
  end
end
