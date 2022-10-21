Rails.application.routes.draw do
  root to: "thaalis#index"
  resources :thaalis
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
