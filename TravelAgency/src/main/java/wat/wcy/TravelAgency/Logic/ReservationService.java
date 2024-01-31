package wat.wcy.TravelAgency.Logic;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.CreateReservationDTO;
import wat.wcy.TravelAgency.DTO.ReservationDTO;
import wat.wcy.TravelAgency.Repositories.ClientRepository;
import wat.wcy.TravelAgency.Repositories.InsuranceRepository;
import wat.wcy.TravelAgency.Repositories.ReservationRepository;
import wat.wcy.TravelAgency.Repositories.TravelOptionRepository;
import wat.wcy.TravelAgency.model.Client;
import wat.wcy.TravelAgency.model.Insurance;
import wat.wcy.TravelAgency.model.Reservation;
import wat.wcy.TravelAgency.model.TravelOption;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ClientRepository clientRepository;
    private final TravelOptionRepository travelOptionRepository;
    private final InsuranceRepository insuranceRepository;
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    public Integer getCountOnGoingReservationsByTravelId(Integer travelId){
        try {
            return reservationRepository.getCountOnGoingReservationsByTravelId(travelId);
        } catch (Exception e){
            throw new InvalidDataAccessResourceUsageException("wrong query");
        }

    }

    public ReservationDTO addReservation(CreateReservationDTO source){
        logger.warn("JESTEM W ADDRESERCATION");

        Client client = clientRepository.findById(source.getClient())
                .orElseThrow(()->new EntityNotFoundException("no such client"));

        logger.warn("FOUND:" + client);

        TravelOption travelOption = travelOptionRepository.findById(source.getTravelOption())
                .orElseThrow(()->new EntityNotFoundException("No such travel"));

        logger.warn("FOUND:" + travelOption);

        Insurance insurance = insuranceRepository.findById(source.getInsurance())
                .orElseThrow(()->new EntityNotFoundException("No such insurance"));
        logger.warn("FOUND:" + insurance);

        Reservation reservation = new Reservation(client,travelOption,insurance,generateReservationNumber(),source.getIsCanceled(),source.getIsAllFood(), source.getReservationPrice());
        return new ReservationDTO(reservationRepository.save(reservation));
    }

    private String generateReservationNumber() {
        // Generate a random UUID and convert it to a string
        return UUID.randomUUID().toString();
    }


}
