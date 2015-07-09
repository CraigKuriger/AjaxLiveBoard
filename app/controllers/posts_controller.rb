class PostsController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    @posts = Post.all
    @list = []
    @posts.sort_by do |p|
    pp "X" * 50      
    pp p.votes.length
    @list << p
    pp "X" * 50
    pp @list
    end
  end
  def create
    @post = Post.create( title: params[:title],
               username: params[:username])
    @post.save
    render json: @post.to_json
  end

  def vote_for
    @post = Post.find(params[:id])
    @post.votes.create(value: 1)
    @post.save

    { vote_counter: @post.votes.count}.to_json
    render json: @post.to_json
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: @post.to_json
  end
end
