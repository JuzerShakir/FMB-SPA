class ThaalisController < ApplicationController
    def index
        @thaalis = Thaali.in_sequence
        @thaali = Thaali.new
    end

    def new
        @thaali = Thaali.new
    end

    def create
        @thaali = Thaali.new(thaali_params)

        if @thaali.save
            flash.now[:notice] = "Thaali number: #{@thaali.number} created!"
            render turbo_stream: [
                turbo_stream.prepend("thaalis", @thaali ),
                turbo_stream.update("new-thaali-form", partial: "thaalis/form", locals: { thaali: Thaali.new }),
                turbo_stream.update("thaali_counter", Thaali.count),
                turbo_stream.prepend("flash", partial: "shared/flash")
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
        flash.now[:notice] = "Thaali number: #{@thaali.number} updated!"
        if @thaali.update(thaali_params)
            render turbo_stream: [
                turbo_stream.prepend("thaalis", @thaali ),
                turbo_stream.update("new-thaali-form", partial: "thaalis/form", locals: { thaali: Thaali.new }),
                turbo_stream.prepend("flash", partial: "shared/flash")
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
        flash.now[:notice] = "Thaali number: #{@thaali.number} is destroyed!"
        render turbo_stream: [
            # an edge case where the current thaali is in the edit form and then delete button is triggered
            turbo_stream.update("new-thaali-form", partial: "thaalis/form", locals: { thaali: Thaali.new }),
            turbo_stream.remove(@thaali),
            turbo_stream.update("thaali_counter", Thaali.count),
            turbo_stream.prepend("flash", partial: "shared/flash")
        ]
    end

    private
        def thaali_params
            params.require(:thaali).permit(:number, :owner, :size)
        end
end