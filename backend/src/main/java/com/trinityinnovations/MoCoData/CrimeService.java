package com.trinityinnovations.MoCoData;

import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Dan Lesko on 4/9/2017.
 */
@Service
public class CrimeService {

    @Autowired
    private CrimeDao crimeDao;

    @Transactional
    public List<Crime> getCrimesInInterval(String start_date, String end_date) {
        return crimeDao.getCrimesInInterval(start_date, end_date);
    }
}