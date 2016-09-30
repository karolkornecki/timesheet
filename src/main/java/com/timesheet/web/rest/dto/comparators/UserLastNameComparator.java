package com.timesheet.web.rest.dto.comparators;

import com.timesheet.web.rest.dto.UserDTO;

import java.text.Collator;
import java.util.Comparator;

/**
 * Comparator by lastName for {@link com.timesheet.web.rest.dto.UserDTO}
 *
 * @author Karol Kornecki
 */
public class UserLastNameComparator implements Comparator<UserDTO> {

    @Override
    public int compare(UserDTO o1, UserDTO o2) {
        Collator collator = Collator.getInstance();
        return collator.compare(o1.getLastName(), o2.getLastName());
    }
}
