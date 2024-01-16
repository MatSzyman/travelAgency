package wat.wcy.TravelAgency.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.Collection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wat.wcy.TravelAgency.DTO.CreateTravelDTO;
import wat.wcy.TravelAgency.DTO.TravelDTO;
import wat.wcy.TravelAgency.Logic.TravelService;
import wat.wcy.TravelAgency.Repositories.TravelRepository;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequestMapping(value = "/travel")
@RestController
@RequiredArgsConstructor
public class TravelController {

    @Autowired
    TravelService travelService;

    @Autowired
    TravelRepository travelRepository;

    private static final Logger logger = LoggerFactory.getLogger(TravelController.class);

    @GetMapping(value = "/all")
    ResponseEntity<List<TravelDTO>> getAllTravels(){
        List<TravelDTO> travels = travelService.getTravels();
        return ResponseEntity.ok(travels);
    }

    @GetMapping(value = "/pageable/all")
    public Page<TravelDTO> getAllTravelsPageable(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ){
        return travelService.getPageableTravels(PageRequest.of(page, size));
    }

    @GetMapping(value = "pageable/cities")
    public ResponseEntity<Page<TravelDTO>> getTravelsByCityName(
            @RequestParam List<String> cityNames,
            Pageable pageable
    ){
        Page<TravelDTO> travels = travelService.getTravelsByCityNameIn(cityNames, pageable);

        if (travels.isEmpty()){
            //return empty list when there are no travels in specific filter
            Page<TravelDTO> emptyPage = new PageImpl<>(Collections.emptyList(), pageable, 0);
            return ResponseEntity.ok(emptyPage);
        }
        return ResponseEntity.ok(travels);
    }

    @GetMapping(value = "pageable/filtered")
    public ResponseEntity<Page<TravelDTO>> getFilteredTravels(
            @RequestParam Optional<List<String>> cityNames,
            Optional<Integer> starsCount,
            Optional<Double> minPrice,
            Optional<Double> maxPrice,
            Pageable pageable
    ){
        Page<TravelDTO> travels = travelService.getFilteredTravels(cityNames, starsCount, maxPrice, minPrice, pageable);

        if(travels.isEmpty()){
            Page<TravelDTO> emptyPage = new PageImpl<>(Collections.emptyList(), pageable, 0);
            return ResponseEntity.ok(emptyPage);
        }
        return ResponseEntity.ok(travels);
    }

    @PostMapping
    ResponseEntity<TravelDTO> addTravel(@RequestBody @Valid CreateTravelDTO travelDTO) throws UnsupportedEncodingException {
        TravelDTO result = travelService.saveTravel(travelDTO);
        String encodedName = URLEncoder.encode(result.getName(), StandardCharsets.UTF_8.toString());

        return ResponseEntity.created(URI.create("/" + encodedName)).body(result);
    }
}
