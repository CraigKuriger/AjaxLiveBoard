class PostsController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    @posts = Post.all
  end
  def create
    @post = Post.create( title: params[:title],
               username: Faker::Internet.user_name,
               comment_count: rand(1000) )
    @post.save
    render json: @post.to_json
  end

  def vote
    @post = Post.find(params[:id])
  if @post.votes.create(value: 1)
    content_type :json
    { vote_counter: post.votes.count}.to_json
  else
    status 403
  end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: @post.to_json
  end
end
