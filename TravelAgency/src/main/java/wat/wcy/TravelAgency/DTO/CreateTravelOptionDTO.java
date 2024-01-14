package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Travel;
import wat.wcy.TravelAgency.model.TravelOption;

import java.time.Instant;

@Value
public class CreateTravelOptionDTO {

    Travel travel;
    Instant departureTime;
    Instant arrivalTime;
    Double travelPrice;

    public TravelOption toTravelOption() {
        return new TravelOption(travel,departureTime,arrivalTime,travelPrice);
    }
}
