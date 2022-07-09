<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220709114451 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE employee (id INT NOT NULL, etablishment_id INT DEFAULT NULL, INDEX IDX_5D9F75A116BE0BCF (etablishment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE manager (id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A116BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE manager ADD CONSTRAINT FK_FA2425B9BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052F98F144A FOREIGN KEY (logo_id) REFERENCES image (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052783E3463 FOREIGN KEY (manager_id) REFERENCES manager (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE module_permission ADD CONSTRAINT FK_75ACB937AFC2B591 FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE module_permission ADD CONSTRAINT FK_75ACB937FED90CCA FOREIGN KEY (permission_id) REFERENCES permission (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE privilege ADD CONSTRAINT FK_87209A87AFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE privilege ADD CONSTRAINT FK_87209A87FED90CCA FOREIGN KEY (permission_id) REFERENCES permission (id)');
        $this->addSql('ALTER TABLE privilege ADD CONSTRAINT FK_87209A87D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE symfony_demo_comment ADD CONSTRAINT FK_53AD8F834B89032C FOREIGN KEY (post_id) REFERENCES symfony_demo_post (id)');
        $this->addSql('ALTER TABLE symfony_demo_comment ADD CONSTRAINT FK_53AD8F83F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE symfony_demo_post ADD CONSTRAINT FK_58A92E65F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE symfony_demo_post_tag ADD CONSTRAINT FK_6ABC1CC44B89032C FOREIGN KEY (post_id) REFERENCES symfony_demo_post (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE symfony_demo_post_tag ADD CONSTRAINT FK_6ABC1CC4BAD26311 FOREIGN KEY (tag_id) REFERENCES symfony_demo_tag (id) ON DELETE CASCADE');
        $this->addSql('DROP INDEX IDX_8D93D64916BE0BCF ON user');
        $this->addSql('ALTER TABLE user DROP etablishment_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052783E3463');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE manager');
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052F98F144A');
        $this->addSql('ALTER TABLE module_permission DROP FOREIGN KEY FK_75ACB937AFC2B591');
        $this->addSql('ALTER TABLE module_permission DROP FOREIGN KEY FK_75ACB937FED90CCA');
        $this->addSql('ALTER TABLE privilege DROP FOREIGN KEY FK_87209A87AFC2B591');
        $this->addSql('ALTER TABLE privilege DROP FOREIGN KEY FK_87209A87FED90CCA');
        $this->addSql('ALTER TABLE privilege DROP FOREIGN KEY FK_87209A87D60322AC');
        $this->addSql('ALTER TABLE symfony_demo_comment DROP FOREIGN KEY FK_53AD8F834B89032C');
        $this->addSql('ALTER TABLE symfony_demo_comment DROP FOREIGN KEY FK_53AD8F83F675F31B');
        $this->addSql('ALTER TABLE symfony_demo_post DROP FOREIGN KEY FK_58A92E65F675F31B');
        $this->addSql('ALTER TABLE symfony_demo_post_tag DROP FOREIGN KEY FK_6ABC1CC44B89032C');
        $this->addSql('ALTER TABLE symfony_demo_post_tag DROP FOREIGN KEY FK_6ABC1CC4BAD26311');
        $this->addSql('ALTER TABLE user ADD etablishment_id INT DEFAULT NULL');
        $this->addSql('CREATE INDEX IDX_8D93D64916BE0BCF ON user (etablishment_id)');
    }
}
