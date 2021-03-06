package com.mycompany.myapp.repository;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.diboot.core.mapper.BaseCrudMapper;
import com.mycompany.myapp.domain.ViewPermission;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data SQL repository for the ViewPermission entity.
 */
@SuppressWarnings("unused")
public interface ViewPermissionRepository extends BaseCrudMapper<ViewPermission> {
    default List<ViewPermission> findAll() {
        return this.selectList(null);
    }

    default Optional<ViewPermission> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }

    default IPage<ViewPermission> findAllByParentIsNull(IPage<ViewPermission> pageable) {
        return this.selectPage(pageable, new QueryWrapper<ViewPermission>().isNull("parent_id"));
    }

    @Select(
        "select self.* from view_permission self left join rel_jhi_authority__view_permissions avp on self.id = avp.view_permissions_id " +
        "left join jhi_user_authority jua on jua.authority_id = avp.authority_id " +
        "where jua.user_id = #{userId}"
    )
    List<ViewPermission> findAllViewPermissionsByUserId(@Param("userId") Long userId);
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove
}
