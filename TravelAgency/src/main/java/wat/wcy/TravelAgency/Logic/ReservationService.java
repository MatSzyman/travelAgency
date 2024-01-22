package wat.wcy.TravelAgency.Logic;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

@Service
public class ReservationService {

    ReservationRepository reservationRepository;
    ClientRepository clientRepository;
    TravelOptionRepository travelOptionRepository;
    InsuranceRepository insuranceRepository;
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    public ReservationService(ReservationRepository reservationRepository, ClientRepository clientRepository,TravelOptionRepository travelOptionRepository, InsuranceRepository insuranceRepository) {
        this.reservationRepository = reservationRepository;
        this.clientRepository = clientRepository;
        this.travelOptionRepository = travelOptionRepository;
        this.insuranceRepository = insuranceRepository;
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

        Reservation reservation = new Reservation(client,travelOption,insurance,source.getReservationNumber(),source.getIsCanceled(),source.getIsAllFood());
        return new ReservationDTO(reservationRepository.save(reservation));
    }


}
