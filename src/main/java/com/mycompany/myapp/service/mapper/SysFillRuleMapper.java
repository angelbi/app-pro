package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.SysFillRuleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SysFillRule} and its DTO {@link SysFillRuleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SysFillRuleMapper extends EntityMapper<SysFillRuleDTO, SysFillRule> {}
