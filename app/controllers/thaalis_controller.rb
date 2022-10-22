class ThaalisController < ApplicationController
    def index
        @thaalis = Thaali.all
        @thaali = Thaali.new
    end

    def new
        @thaali = Thaali.new
    end

    def create
        @thaali = Thaali.new(thaali_params)

        if @thaali.save
            render turbo_stream: [
                turbo_stream.prepend("thaalis", @thaali ),
                turbo_stream.update("new-thaali-form", partial: "thaalis/form", locals: { thaali: Thaali.new })
            ]
        else
            render turbo_stream: [
                turbo_stream.replace(@thaali, partial: "thaalis/form", locals: { thaali: @thaali } )
            ]
        end
    end

    def edit
        @thaali = Thaali.find(params[:id])

        render turbo_stream: [
            turbo_stream.update("new-thaali-form", partial: "thaalis/form", locals: { thaali: @thaali })
        ]
    end

    def update
        @thaali = Thaali.find(params[:id])
        if @thaali.update(thaali_params)
            render turbo_stream: [
                turbo_stream.prepend("thaalis", @thaali ),
                turbo_stream.update("new-thaali-form", partial: "thaalis/form", locals: { thaali: Thaali.new })
            ]
        else
            render turbo_stream: [
                turbo_stream.replace(@thaali, partial: "thaalis/form", locals: { thaali: @thaali } )
            ]
        end
    end

    def destroy
        @thaali = Thaali.find(params[:id])
        @thaali.destroy
        render turbo_stream: [
            turbo_stream.remove(@thaali)
        ]
    end

    private
        def thaali_params
            params.require(:thaali).permit(:number, :owner, :size)
        end
end