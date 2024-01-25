package wat.wcy.TravelAgency.Controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import wat.wcy.TravelAgency.Logic.ReservationService;

@RequestMapping(value = "/reservation")
@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "Keycloak")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping(value = "/count")
    @PreAuthorize("hasRole('admin')")
    public Integer getCountOnGoingReservationsByTravelId(
            @RequestParam Integer travelId
    ){
        return reservationService.getCountOnGoingReservationsByTravelId(travelId);
    }

}
