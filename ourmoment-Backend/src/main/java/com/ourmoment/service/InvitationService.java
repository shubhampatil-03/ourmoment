
package com.ourmoment.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ourmoment.dto.CreateInvitationRequest;
import com.ourmoment.dto.InvitationResponseDto;
import com.ourmoment.entity.Invitation;
import com.ourmoment.entity.User;
import com.ourmoment.repository.InvitationRepository;
import com.ourmoment.repository.UserRepository;

@Service
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;

    public InvitationService(
            InvitationRepository invitationRepository,
            UserRepository userRepository) {
        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public InvitationResponseDto create(
            String email, CreateInvitationRequest request) {

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));

        Invitation invitation = new Invitation();
        invitation.setOwner(owner);
        invitation.setRecipientName(request.getRecipientName());
        invitation.setTitle(request.getTitle());
        invitation.setMessage(request.getMessage());
        invitation.setOccasion(request.getOccasion());
        invitation.setEventDate(request.getEventDate());

        return new InvitationResponseDto(
                invitationRepository.save(invitation));
    }

    @Transactional(readOnly = true)
    public List<InvitationResponseDto> getMine(String email) {
        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));

        return invitationRepository
                .findByOwnerIdOrderByCreatedAtDesc(owner.getId())
                .stream()
                .map(InvitationResponseDto::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public InvitationResponseDto getPublic(String token) {
        Invitation invitation = findByToken(token);
        return new InvitationResponseDto(invitation);
    }

    @Transactional
    public InvitationResponseDto respond(
            String token, String response) {

        if (!"ACCEPTED".equals(response)
                && !"DECLINED".equals(response)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Response must be ACCEPTED or DECLINED");
        }

        Invitation invitation = findByToken(token);
        invitation.setResponseStatus(response);

        return new InvitationResponseDto(
                invitationRepository.save(invitation));
    }

    private Invitation findByToken(String token) {
        return invitationRepository.findByShareToken(token)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Invitation not found"));
    }
}
