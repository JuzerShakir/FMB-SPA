Rails.application.routes.draw do
  root to: "thaalis#index"
  resources :thaalis do
    collection do
      post :search
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
