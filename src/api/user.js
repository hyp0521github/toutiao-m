import request from '@/utils/request.js'

// 表单验证登录api
export const userAPI = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送短信验证api
export const codeAPI = mobile => {
  return request({
    // get方式拼接url地址
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// 获取所有频道列表
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 获取推荐新闻
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 获取用户的频道
export const userChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 删除用户频道
export const deleteUserChannels = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}

// 添加用户频道
export const addUserChannels = channel => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

// 获取搜索结果
export const getSearchResults = (q, page) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}

// 获取搜索联想建议
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取新闻详情
export const getNewDetail = (id) => {
  return request({
    method: 'GET',
    // 字符串拼接或自动把拼接的数据转化成字符串格式
    url: `/v1_0/articles/${id}`
  })
}

// 关注用户
export const focusUser = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注用户
export const notFocusUser = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 获取关注用户信息
export const getUserFollowings = (params) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'GET',
    params
  })
}

// 取消收藏文章
export const cancelCollectionsArticle = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

// 收藏文章
export const collectionsArticle = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 获取用户收藏列表
export const getCollectionsArticle = (params) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'GET',
    params
  })
}

// 点赞文章
export const likingsArticle = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消点赞
export const cancelLikingsArticle = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

// 获取评论或评论回复
export const getComments = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

// 对评论区点赞
export const likingsComment = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消对评论区点赞
export const cancelLikingsComment = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 对文章或者评论进行评论
export const releaseArticle = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 修改用户资料
export const updateUserProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 编辑用户照片资料（头像、身份证照片）
export const updateUserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
