package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Travel;
import wat.wcy.TravelAgency.model.TravelOption;

import java.time.Instant;

@Value
public class TravelOptionDTO {

    Integer id;
    Travel travel;
    Instant departureTime;
    Instant arrivalTime;

    public TravelOptionDTO(TravelOption source) {
        this.id = source.getId();
        this.travel = source.getTravel();
        this.departureTime = source.getDepartureTime();
        this.arrivalTime = source.getArrivalTime();
    }

}
