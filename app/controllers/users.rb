get '/session' do
  session.inspect
end

#send to registration form
get '/users/new' do
  if request.xhr?
    erb :'/users/new', layout: false
  else
    erb :'/users/new'
  end
end

#add new user to database
post '/users' do
  @user = User.create(params[:user])
  if @user.save
    session[:user_id] = @user.id
    redirect "/"
  else
    @errors = @user.errors.full_messages
    erb :'/users/new'
  end
end

#sends user to login page   <<--- NECESSARY??
get '/users/login' do
  if request.xhr?
    erb :'/users/login', layout: false
  else
    erb :'/users/login'
  end
end

#sends login request to database
post '/users/login' do
  user = User.find_by(username: params[:username])
  if user && user.authenticate(params[:password])
    session[:user_id] = user.id
    redirect "/"
  else
    @error_message = true
    erb :'/users/login'
  end
end

#logs user out 
get '/users/logout' do
  session.delete(:user_id)
  redirect '/'
end

#View user profile
get '/users/:id' do
  @user = User.find(params[:id])
  start = 0
  stop = 19
  @photos = @user.hearts.order(created_at: :desc)[start..stop]
  if request.xhr?
    start = params[:start].to_i
    stop = params[:stop].to_i
    if @photos.last.id < start
      return 400
    end
    @photos = @user.photos.order(created_at: :desc)[start..stop]
    erb :'/photos/_photos.json', layout: false
  else
    erb :'/users/show'
  end

end

#Edit user profile
get '/users/:id/edit' do
  if current_user.id.to_s != params[:id]
    @params = params[:id]
    erb :access_denied
  else
    @user = User.find(params[:id])
    erb :'/users/edit'
  end
end

#commit edits to database
put '/users/:id' do
  @user = User.find(params[:id])
  old_password = params[:password_old]
  if (@user.password == old_password)
    @user.update_attributes(params[:user])
    redirect "/users/#{@user.id}"
  else
    @error_message = true
    erb :'/users/edit'
  end
end

#delete user profile
delete '/users/:id' do
  if is_admin? || current_user.id.to_s == params[:id]
    user = User.find(params[:id])
    user.destroy
    if !is_admin?
      session.delete(:user_id)
    end
    redirect '/'
  else 
    erb :access_denied
  end
end
 
 
