module.exports = {
    Like: {
        product: ({ id }, _, { prisma }) => prisma.like.findOne({where: { id }}).product(),
        user: ({ id }, _, { prisma }) => prisma.like.findOne({where: { id }}).user()
    }
}
// 이건 느낌이 product 나 user를 불러오려고 하는거 같은데
// 어디에서 써먹는지 알 수 가 없다