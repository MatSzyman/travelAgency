package wat.wcy.TravelAgency.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "FILE_DATA")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String type;

    @Lob
    private byte[] data;

    @OneToOne
    @JoinColumn(name = "travel_id", referencedColumnName = "id")
    private Travel travel;
}


