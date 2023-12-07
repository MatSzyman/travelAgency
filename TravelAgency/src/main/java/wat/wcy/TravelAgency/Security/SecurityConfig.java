package wat.wcy.TravelAgency.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.authorizeHttpRequests(authorize -> {
            authorize.anyRequest().authenticated(); //kaze springowi sprawdzac zeby kazdy request byl autentykowany
        });
        httpSecurity.oauth2ResourceServer(t ->{
            t.jwt(Customizer.withDefaults());
        });
        httpSecurity.sessionManagement(
                t -> t.sessionCreationPolicy(SessionCreationPolicy.STATELESS) //nie tworzy sesji uzytkownika
        );
        return httpSecurity.build();
    }
}
