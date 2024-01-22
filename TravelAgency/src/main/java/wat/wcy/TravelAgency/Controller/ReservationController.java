package wat.wcy.TravelAgency.Controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wat.wcy.TravelAgency.DTO.CreateReservationDTO;
import wat.wcy.TravelAgency.DTO.ReservationDTO;
import wat.wcy.TravelAgency.Logic.ReservationService;

@RestController
@RequestMapping(value = "/reservation")
public class ReservationController {

    ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping(value = "/add")
    ResponseEntity<ReservationDTO> saveReservation(@RequestBody @Valid CreateReservationDTO source){
        ReservationDTO reservationDTO = reservationService.addReservation(source);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationDTO);
    }

}
