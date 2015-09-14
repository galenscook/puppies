
get '/session' do
  session.inspect
end
#send to registration form
get '/users/new' do
  erb :'/users/new'
end

#add new user to database
post '/users' do
  @user = User.create(params[:user])
  if @user.save
    session[:user_id] = @user.id
    redirect "/users/#{@user.id}"
  else
    @errors = @user.errors.full_messages
    erb :'/users/new'
  end
end

#sends user to login page   <<--- NECESSARY??
get '/users/login' do
  erb :'/users/login'
end

#sends login request to database
post '/users/login' do
  user = User.find_by(username: params[:username])
  if user.authenticate(params[:password])
    session[:user_id] = user.id
    redirect "/users/#{user.id}"
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
  erb :'/users/show'
end

#Edit user profile
get '/users/:id/edit' do
  if current_user.id != params[:id]
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
  if old_password == @user.password
    @user.update_attributes(params[:user])
    redirect "/users/#{@user.id}"
  else
    @error_message = true
    erb :'/users/edit'
  end
end

#delete user profile
delete '/users/:id' do
  if current_user.id != params[:id]
    erb :access_denied
  else
    user = User.find(params[:id])
    user.destroy
    redirect '/'
  end
end
 
