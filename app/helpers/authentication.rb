helpers do
  def is_authenticated?
    !session[:user_id].nil?
  end

  def current_user
    user = User.find(session[:user_id])
    user
  end

  def is_admin?
    current_user === User.find_by(username: "admin")
  end
end