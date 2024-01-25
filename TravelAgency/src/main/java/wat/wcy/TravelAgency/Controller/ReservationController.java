package wat.wcy.TravelAgency.Controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import wat.wcy.TravelAgency.DTO.CreateReservationDTO;
import wat.wcy.TravelAgency.DTO.ReservationDTO;
import wat.wcy.TravelAgency.Logic.ReservationService;

@RequestMapping(value = "/reservation")
@RestController
@SecurityRequirement(name = "Keycloak")
public class ReservationController {

    ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping(value = "/count")
    @PreAuthorize("hasRole('admin')")
    public Integer getCountOnGoingReservationsByTravelId(
            @RequestParam Integer travelId
    ){
        return reservationService.getCountOnGoingReservationsByTravelId(travelId);
    }

    @PostMapping(value = "/add")
    ResponseEntity<ReservationDTO> saveReservation(@RequestBody @Valid CreateReservationDTO source){
        ReservationDTO reservationDTO = reservationService.addReservation(source);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationDTO);
    }

}
