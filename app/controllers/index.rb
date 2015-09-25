get '/' do
  redirect '/photos'
end

get '/admin' do
  @photos = Photo.all.order(created_at: :desc)[0..10]
  @users = User.all.order(created_at: :desc)[0..10]
  @comments = Heart.all.where("comment is not null").order(created_at: :desc)[0..10]
  erb :'/admin/index'
end